import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import query from "search-github/gql/queries/repos.graphql";

export default class SearchWrapperComponent extends Component {
    @service('auth-apollo') apollo;
    searchSorts = [
        { label: "Best Match", value: "match" },
        { label: "Most stars", value: "stars" },
        { label: "Most forks", value: "forks" }
    ]
    @tracked curSort = this.searchSorts[0].value
    @tracked inputValue = ''
    @tracked searchResult = [
        {
            "id": "MDEwOlJlcG9zaXRvcnkyMTUxMjM4MTI=",
            "name": "HaatProtidinNew",
            "createdAt": "2019-10-14T19:03:10Z",
            "url": "https://github.com/TIZadid/HaatProtidinNew",
            "forkCount": 2,
            "owner": {
                "avatarUrl": "https://avatars2.githubusercontent.com/u/35076053?s=100&v=4",
                "login": "TIZadid",
                "id": "MDQ6VXNlcjM1MDc2MDUz"
            },
            "description": "goodproject"
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnkyMjA4NTQ2NDc=",
            "name": "andhi",
            "createdAt": "2019-11-10T21:37:02Z",
            "url": "https://github.com/muhammadirwan750/andhi",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars1.githubusercontent.com/u/57602914?s=100&v=4",
                "login": "muhammadirwan750",
                "id": "MDQ6VXNlcjU3NjAyOTE0"
            },
            "description": "Goodproject"
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnkxMTI0ODg5",
            "name": "project2425",
            "createdAt": "2010-11-30T08:55:15Z",
            "url": "https://github.com/niks123/project2425",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars0.githubusercontent.com/u/492979?s=100&v=4",
                "login": "niks123",
                "id": "MDQ6VXNlcjQ5Mjk3OQ=="
            },
            "description": "goodproject"
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnkxMDE3MDkyNjg=",
            "name": "htg000",
            "createdAt": "2017-08-29T02:24:00Z",
            "url": "https://github.com/chinafront888/htg000",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars1.githubusercontent.com/u/31427332?s=100&v=4",
                "login": "chinafront888",
                "id": "MDEyOk9yZ2FuaXphdGlvbjMxNDI3MzMy"
            },
            "description": "goodProject"
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnkyMzk3MDQ1MDQ=",
            "name": "uniapp-goodproject",
            "createdAt": "2020-02-11T07:44:05Z",
            "url": "https://github.com/Gang-bb/uniapp-goodproject",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars0.githubusercontent.com/u/43952689?s=100&u=9a047853c70d9094f881aff931b0c870c7b96bb9&v=4",
                "login": "Gang-bb",
                "id": "MDQ6VXNlcjQzOTUyNjg5"
            },
            "description": "一些uniapp好用的项目和插件资源总结，以链接和相关截图呈现。"
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnk0NDAxMjc4",
            "name": "Goodproject",
            "createdAt": "2012-05-22T02:24:55Z",
            "url": "https://github.com/livesite/Goodproject",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars0.githubusercontent.com/u/1762197?s=100&v=4",
                "login": "livesite",
                "id": "MDQ6VXNlcjE3NjIxOTc="
            },
            "description": null
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnk4MzEzNjIyNA==",
            "name": "goodproject",
            "createdAt": "2017-02-25T14:14:48Z",
            "url": "https://github.com/thgleb/goodproject",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars3.githubusercontent.com/u/4612969?s=100&u=dfb716a6554cb51fac279da1a9794d8c594c1267&v=4",
                "login": "thgleb",
                "id": "MDQ6VXNlcjQ2MTI5Njk="
            },
            "description": null
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnkxOTQ1MzY4MjA=",
            "name": "goodproject",
            "createdAt": "2019-06-30T16:19:49Z",
            "url": "https://github.com/HaiqiChen/goodproject",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars2.githubusercontent.com/u/49803588?s=100&v=4",
                "login": "HaiqiChen",
                "id": "MDQ6VXNlcjQ5ODAzNTg4"
            },
            "description": null
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnkyNDgzNzI3OTM=",
            "name": "goodproject",
            "createdAt": "2020-03-19T00:21:58Z",
            "url": "https://github.com/FelixKerser/goodproject",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars1.githubusercontent.com/u/62158934?s=100&v=4",
                "login": "FelixKerser",
                "id": "MDQ6VXNlcjYyMTU4OTM0"
            },
            "description": null
        },
        {
            "id": "MDEwOlJlcG9zaXRvcnk1OTA5NjU2Mg==",
            "name": "goodproject",
            "createdAt": "2016-05-18T08:28:02Z",
            "url": "https://github.com/jinhee0833/goodproject",
            "forkCount": 0,
            "owner": {
                "avatarUrl": "https://avatars1.githubusercontent.com/u/9565099?s=100&u=9cef02c475dbf20454ad784a4438f373a75e1d67&v=4",
                "login": "jinhee0833",
                "id": "MDQ6VXNlcjk1NjUwOTk="
            },
            "description": "goodday"
        }
    ];
    @tracked searchDesc = null;
    @action
    changeSort(sort) {
        this.curSort = sort
        this.inputChange(this.inputValue)
    }
    @action
    inputChange(value) {
            const searchSort = this.curSort
            const variables = { searchValue: `${value} sort:${searchSort}` };
            this.apollo.watchQuery({ query, variables }, "search")
                .then(data => {
                    this.searchResult = data.nodes
                    this.searchDesc = { pageInfo: data.pageInfo, repositoryCount: data.repositoryCount }
                })
    }
}
