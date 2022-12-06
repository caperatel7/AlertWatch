const {getClientSitesByUsernameQuery, getUsersQuery,getClientSitesQuery, getUsersByClientSiteQuery,createUserSiteQuery,deleteUserSiteQuery } = require('../../db/config.js');


// get all sites for a user
async function getClientSitesByUsername (request, response) {
    res = await getClientSitesByUsernameQuery(request.params.username);
    response.send(res);
}
// get all users and their sites 
async function getAllUserAndSites (request, response) {
    console.log('######################in controller-get All Users and Sites');
    let users = await getUsersQuery();

    for (let user of users) {
        let sites = await getClientSitesByUsernameQuery(user.username);
        user.sites = sites;  
    }

    response.send(users);
}

// get all websites and users for those sites
async function getAllSitesAndUsers (request, response) {
    console.log('######################in controller-get All Sites and Users');
    
    let sites = await getClientSitesQuery();
    for (let site of sites) {
        let users = await getUsersByClientSiteQuery(site.site);
        site.users = users;
    }
    response.send(sites);


    }

    //add user/site relationship 
    async function createUserSite (request, response) {
        const {username, site} = request.body;
        console.log('in controller-create UserSite',username, site);

        try{

        for (let s of site) {
            res = await createUserSiteQuery(username, s);
        }
      
        response.send(res);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
    }
    
    //delete user/site relationship
    async function deleteUserSite (request, response) {
        const {username, site} = request.body;


        console.log('in controller-delete UserSite',username, site);
        if (site.length > 0) {
            for (let s of site) {
                res = await deleteUserSiteQuery(username, s);
            }
        }
       
        
        response.send(res);
    }



module.exports = {getClientSitesByUsername,getAllUserAndSites,getAllSitesAndUsers,createUserSite,deleteUserSite}; 