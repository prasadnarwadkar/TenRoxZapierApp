const testAuth = (z /*, bundle*/) => {


    const promise = z.request({
        url: 'https://{{bundle.authData.orgname}}.tenrox.net/TEnterprise/api/v2/Projects',
    });

    // This method can return any truthy value to indicate the credentials are valid.
    // Raise an error to show
    return promise.then((response) => {
        console.log("Response from API for GET on /api/v2/Projects is " + response.content);
        z.console.log("Response from API for GET on /api/v2/Projects is " + response.content);

        if (response.status === 401) {
            throw new Error('The Token you supplied is invalid');
        }
        return response;
    });
};

const getToken = (z, bundle) => {

    const promise = z.request({
        method: 'POST',
        url: 'https://{{bundle.authData.orgname}}.tenrox.net/TEnterprise/api/token',
        body: {
            grant_type: 'password',
            username: bundle.authData.username,
            password: bundle.authData.password,
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'OrgName': bundle.authData.orgname
        }
    });

    return promise.then((response) => {
        console.log("getToken Response received is " + response.content);
        z.console.log("getToken Response received is " + response.content);

        if (response.status === 401) {
            throw new Error('The username/password you supplied is invalid');
        }
        try {
            const json = JSON.parse(response.content);
            return {
                token: json.access_token || ''
            };
        }
        catch (err) {
            console.log("getToken error received is " + err);
            z.console.log("getToken Response received is " + err);

            throw new Error(err + ". Response from API is not JSON probably.");

         }
    });
};

module.exports = {
    type: 'session',
    // Define any auth fields your app requires here. The user will be prompted to enter this info when
    // they connect their account.
    fields: [
        { key: 'username', label: 'Username', required: true, type: 'string' },
        { key: 'password', label: 'Password', required: true, type: 'string' },
        { key: 'orgname', label: 'Organization Name', required: true, type: 'string' }
    ],
    // The test method allows Zapier to verify that the credentials a user provides are valid. We'll execute this
    // method whenver a user connects their account for the first time.
    test: testAuth,
    // The method that will exchange the fields provided by the user for session credentials.
    sessionConfig: {
        perform: getToken
    },
    // assuming "username" is a key returned from the test
    connectionLabel: '{{username}}'
};
