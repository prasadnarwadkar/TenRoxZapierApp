require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('session auth app', () => {
    it('has an exchange for username/password', (done) => {
        // Try changing the values of username or password to see how the test method behaves
        const bundle = {
            authData: {
                username: 'username here',
                password: 'password here',
                orgname: 'org name here'
            }
        };

        appTester(App.authentication.sessionConfig.perform, bundle)
            .then((newAuthData) => {
                if (newAuthData && newAuthData.token) {
                    console.log("Auth token received is " + newAuthData.token);
                    
                }

                newAuthData.token.length.should.be.aboveOrEqual(8);
                done();
            })
            .catch(done);
    });

    it('has auth details added to every request', (done) => {
        // Try changing the values of username or password to see how the test method behaves
        const bundle = {
            authData: {
                token: 'replace this string with access token received from earlier call to getToken'
            }
        };

        appTester(App.authentication.test, bundle)
            .then((response) => {
                console.log("Response from API for GET on /api/v2/Projects is " + response.content);
                response.status.should.eql(200);

                done();
            })
            .catch(done);
    });
});
