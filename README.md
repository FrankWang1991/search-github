# search-github

使用 GraphGL 与 GitHub API v4 相互配合,查询 GitHub 的 repos .   

使用的环境:
 - node 
 - npm
 - Ember.js 3.16.3
 - 

## 环境安装

### 1. 安装 typescript 
使用 [这个教程](https://nightire.gitbook.io/ember-octane/resources/integrate-with-typescript) 在项目中安装 typescript.  

### 2. 安装 scss 、bootstrap 等插件  
参照 [这篇文章](https://blog.csdn.net/peng_9/article/details/83993084) :  

```powershell
ember install ember-bootstrap
ember install ember-css-modules ember-css-modules-sass
```

至此,目前需要的插件安装完毕,使用 `ember s` 启动项目,项目正常启动,显示:

![截屏2020-03-2416.55.27](https://tva1.sinaimg.cn/large/00831rSTly1gd54d927f9j30ic0hpq37.jpg)

## 安装 Apollo-client 并配置

使用:

```powershell
ember install ember-apollo-client
```

安装此插件.

对此插件进行配置,按照 [插件官方说明](https://github.com/ember-graphql/ember-apollo-client) :

```javascript
// config/environment.js
let ENV = {
  ...
  apollo: {
    apiURL: 'https://api.github.com/graphql',
    // Optionally, set the credentials property of the Fetch Request interface
    // to control when a cookie is sent:
    // requestCredentials: 'same-origin', // other choices: 'include', 'omit'
  },
  ...
}
```

```javascript
// ember-cli-build.js
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    emberApolloClient: {
      keepGraphqlFileExtension: true
    }
  });

  return app.toTree();
};
```

配置请求的内容:

```json
query getSearch($searchValue: String!) {
  search(query: $searchValue, type: REPOSITORY, first: 12) {
    nodes {
      ... on Repository {
        id
        createdAt
        description
        forkCount
        name
        owner {
          id
          avatarUrl(size: 160)
          login
        }
        url
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    repositoryCount
  }
}

```

具体的配置,可以参照 GitHub 的 [开发者网站](https://developer.github.com/v4/explorer/) ,

同时修改一下页面:

```handlebars
{{!-- application --}}
<nav class="navbar navbar-expand-lg mb-4 navbar-light bg-light justify-content-center">
  <h1>
    Search Github
  </h1>
</nav>
{{outlet}}
```

![截屏2020-03-2417.18.53](https://raw.githubusercontent.com/FrankWang1991/images/master/2020-03-24-截屏2020-03-2417.18.53-0u0tt0.png)

现在页面运行良好.

## 进行页面实现

由于逻辑和页面元素过多,代码请移步 [search-github](https://github.com/FrankWang1991/search-github) 进行查看;

主要的逻辑在于输入之后进行查询:

```javascript
// app/components/search-wrapper.js
// ...
inputChange(value) {
  const searchSort = this.curSort
  const variables = { searchValue: `${value} sort:${searchSort}` };
  this.apollo.watchQuery({ query, variables }, "search")
    .then(data => {
    this.searchResult = data.nodes
    this.searchDesc = { pageInfo: data.pageInfo, repositoryCount: data.repositoryCount }
  })
}
```

也就是在用户输入完毕之后(此处需使用了防抖,具体参见下文),使用 apollo 实例进行查询.在这个时候浏览器会报错,错误内容是:  

![截屏2020-03-2417.29.22](https://raw.githubusercontent.com/FrankWang1991/images/master/2020-03-24-截屏2020-03-2417.29.22-XUS0kB.png)

是由于没有权限造成的,那需要进行 OAuth 验证或者添加相关的 token,由于是简单的 demo,所以就简单的在请求行中添加 `authorization` 来获取数据.此 token 在 GitHub 上进行申请,为了方便将所有 read 全部打开了.如果需要自行调试,请重新申请 token.  

如何添加呢?  

需要继承本 service,并重写其中的函数:    

```powershell
ember g service auto-apollo
yarn add -D apollo-link-context && yarn add -D apollo-link-error 
```



```javascript
// app/service/auto-apollo.ts
// ...
link() {
    const httpLink = super.link()

    // Middleware
    const authMiddleware = setContext(async (_request, context) => {
      if (!this.token) {
        this.token = await localStorage.getItem('token') || '';
      }
      Object.assign(context, {
        headers: {
          authorization: "bearer your_token"
        }
      });
      return context;
    });

    // Afterware
    const resetToken = onError(({ networkError }) => {
      if (networkError && networkError.statusCode === 401) {
        // remove cached token on 401 from the server
        this.token = '';
      }
    });

    const authFlowLink = authMiddleware.concat(resetToken);

    return authFlowLink.concat(httpLink);
  }
```

 至此,项目完成:

![截屏2020-03-2417.44.35](https://raw.githubusercontent.com/FrankWang1991/images/master/2020-03-24-截屏2020-03-2417.44.35-zEgszD.png)

除了由于网络问题导致的图片加载问题,已经都可以了.  

