const authentication = require('./authentication');
const new_project = require('./triggers/new_project');

const includeTokenInHeader = (request, z, bundle) => {
    if (request.url.indexOf('TEnterprise/api/token') != -1) {
        return request;
    }
    if (bundle.authData.token) {
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${bundle.authData.token}`;
    }
    return request;
};

// If we get a response and it is a 401, we can raise a special error telling Zapier to retry this after another exchange.
const sessionRefreshIf401 = (response, z, bundle) => {
    if (bundle.authData.token) {
        if (response.status === 401) {
            throw new z.errors.RefreshAuthError('Access Token needs to be refreshed.');
        }
    }
    return response;
};

const App = {
    // This is just shorthand to reference the installed dependencies you have. Zapier will
    // need to know these before we can upload
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,

    authentication: authentication,

    beforeRequest: [
        includeTokenInHeader
    ],

    afterResponse: [
        sessionRefreshIf401
    ],

    resources: {
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {
        [new_project.key]: new_project,
    },

    // If you want your searches to show up, you better include it here!
    searches: {
    },

    // If you want your creates to show up, you better include it here!
    creates: {
    }
};

// Finally, export the app.
module.exports = App;
