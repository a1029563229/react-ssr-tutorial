import React from "react";

const WithError = () => WrappedComponent => {
  return class Error extends React.PureComponent {
    static async getInitialProps(ctx) {
      const result = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      // 这里从业务上来说与直接返回 result 并无区别
      // 这里只是强调对发生错误时的特殊处理
      if (result.errors) {
        return { errors: result.errors };
      }
      return result.data;
    }

    render() {
      const { errors } = this.props;
      if (errors && errors.length > 0) return <section>Error: {JSON.stringify(errors)}</section>
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default WithError;