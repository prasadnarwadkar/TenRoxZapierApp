module.exports = {
    key: 'new_project',

    noun: 'Project',
    display: {
        label: 'New Project',
        description: 'Triggers when a new Project is created.'
    },

    operation: {
        inputFields: [],

        perform: (z, bundle) => {
            const promise = z.request({
                url: 'https://{{bundle.authData.orgname}}.tenrox.net/TEnterprise/api/v2/Projects',
                method: 'GET'
            });

            return promise.then((response) => {

                console.log("Response from API to GET on /api/v2/Projects is " + response.content);
                z.console.log("Response from API to GET on /api/v2/Projects is " + response.content);

                try {
                    let items = JSON.parse(response.content);
                    items.forEach(item => {
                        item.id = item.UniqueId;
                        item.textId = item.Id;
                    })

                    return items;
                }
                catch (err)
                {
                    throw new Error(err + " Response from API is not JSON probably.");
                }
            });
        },

        sample: {
            "id": 1,
            "textId": "sample string 2",
            "Name": "sample string 3",
            "Description": "sample string 4",
            "AccessType": 1,
            "StartDate": "2018-03-26T00:00:00-04:00",
            "EndDate": "2018-03-26T00:00:00-04:00",
            "ProjectCode": "sample string 5",
            "IsPlaceholder": 1,
            "Suspend": 1,
            "DefaultPhaseId": 1,
            "OverrideFunded": 1,
            "OverrideRandD": 1,
            "OverrideCapitalized": 1,
            "OverrideCosted": 1,
            "OverrideBillable": 1,
            "IsFunded": 1,
            "IsRandD": 1,
            "IsCapitalized": 1,
            "IsPayable": 1,
            "IsBillable": 1,
            "State": "sample string 6",
            "Priority": "sample string 7",
            "HierarchyCode": "sample string 8",
            "CompanyId": 1,
            "OverridePlan": 1,
            "AllowUserToEditETC": 1,
            "WIPRule": 1,
            "UnearnedRevenueAccount": 1,
            "ProjectWorkflowMapId": 9,
            "WIPAccount": 1,
            "RevenueAccount": 1,
            "ClientId": 10,
            "ManagerId": 11,
            "ParentId": 1,
            "AlternateManagerId": 12,
            "ActualManagerId": 13,
            "PortfolioId": 14,
            "CanBeInvoiced": 1,
            "ManagerAutoApproved": 15,
            "Phealth": "sample string 16",
            "TrackingNo": "sample string 17",
            "CreatedBy": 18,
            "CreationDate": "2018-03-26T00:00:00-04:00",
            "UpdatedOn": "2018-03-26T00:00:00-04:00",
            "TimeEntryNotesOption": "sample string 19",
            "RevenueRecognitionAccountId": 1,
            "ContactId": 20
        },
        outputFields: [
            {
                key: 'id'
            },
            {
                key: 'textId'
            },
            {
                key: 'Name'
            },
            {
                key: 'Description'
            },
            {
                key: 'AccessType'
            },
            {
                key: 'StartDate'
            },
            { key: 'EndDate' },
            { key: 'ProjectCode' },
            { key: 'IsPlaceholder' },
            { key: 'Suspend' },
            { key: 'DefaultPhaseId' },
            { key: 'OverrideFunded' },
            { key: 'OverrideRandD' },
            { key: 'OverrideCapitalized' },
            { key: 'OverrideCosted' },
            { key: 'OverrideBillable' },
            { key: 'IsFunded' },
            { key: 'IsRandD' },
            { key: 'IsCapitalized' },
            { key: 'IsPayable' },
            { key: 'IsBillable' },
            { key: 'State' },
            { key: 'Priority' },
            { key: 'HierarchyCode' },
            { key: 'CompanyId' },
            { key: 'OverridePlan' },
            { key: 'AllowUserToEditETC' },
            { key: 'WIPRule' },
            { key: 'UnearnedRevenueAccount' },
            { key: 'ProjectWorkflowMapId' },
            { key: 'WIPAccount' },
            { key: 'RevenueAccount' },
            { key: 'ClientId' },
            { key: 'ManagerId' },
            { key: 'ParentId' },
            { key: 'AlternateManagerId' },
            { key: 'ActualManagerId' },
            { key: 'PortfolioId' },
            { key: 'CanBeInvoiced' },
            { key: 'ManagerAutoApproved' },
            { key: 'Phealth' },
            { key: 'TrackingNo' },
            { key: 'CreatedBy' },
            { key: 'CreationDate' },
            { key: 'UpdatedOn' },
            { key: 'TimeEntryNotesOption' },
            { key: 'RevenueRecognitionAccountId' },
            { key: 'ContactId' }
        ]
    }


};