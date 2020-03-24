import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import query from "search-github/gql/queries/repos.graphql";

export default class SearchWrapperComponent extends Component {
    @service('auth-apollo') apollo;
    @tracked isResetToken = false
    searchSorts = [
        { label: "Best Match", value: "match" },
        { label: "Most stars", value: "stars" },
        { label: "Most forks", value: "forks" }
    ]
    @tracked curSort = this.searchSorts[0].value
    @tracked inputValue = ''
    @tracked searchResult = [];
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
    @action
    resetToken() {
        this.isResetToken = !this.isResetToken
    }
    @action
    confirmToken(token) {
        localStorage.setItem("token",token)
        this.isResetToken = !this.isResetToken
    }
}
