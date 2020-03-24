
import ApolloService from 'ember-apollo-client/services/apollo';
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";

export default class AuthApolloService extends ApolloService {
  token = '';
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  clientOptions() {
    return {
      link: this.link(),
      cache: this.cache(),
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  link() {
    const httpLink = super.link()

    // Middleware
    const authMiddleware = setContext(async (_request, context) => {
      if (!this.token) {
        this.token = await localStorage.getItem('token') || '';
      }
      Object.assign(context, {
        headers: {
          authorization: "bearer c2cdb8d4a457b829e77a7f55ac4cf0bd237af1b6"
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
}
