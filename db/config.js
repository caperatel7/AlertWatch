const {Pool, Client} = require("pg");

const  credentials = {
    user: "postgres",
    host: "localhost",
    database: "AlertWatch",
    password: "",
    port: "5432",
};

const pool = new Pool(credentials);
const client = new Client(credentials);

const getUsersQuery = async () => {
    let res = await pool.query("SELECT * FROM users");
    return res.rows;
  }
const getUserQuery = async (username) => {
    let res = await pool.query("SELECT * FROM users WHERE id =$1", [username]);
    return res.rows;
  }
const deleteUserQuery = async (username) => {
    let res = await pool.query("DELETE FROM users WHERE id = $1", [username]);
    return res.rows;
    }
const createUserQuery = async (username, password, display_name, privilege) => {
    let res = await pool.query("INSERT INTO users (username, password, display_name, privilege) VALUES ($1, $2, $3, $4)", [username, password, display_name, privilege]);
    return res.rows;
    }
const updatePasswordQuery = async (username, password) => {
    let res = await pool.query("UPDATE users SET password = $1 WHERE id = $2", [password, username]);
    return res.rows;
    }
const updateUserQuery = async (username, display_name, privilege) => {
    let res = await pool.query("UPDATE users SET display_name = $1, privilege = $2 WHERE id = $3", [display_name, privilege, username]);
    return res.rows;
    }



// client_sites queries 
const getClientSitesQuery = async () => {
    let res = await pool.query("SELECT * FROM client_sites");
    return res.rows;
    }
const getClientSiteQuery = async (site) => {
    let res = await pool.query("SELECT * FROM client_sites WHERE site = $1", [site]);
    return res.rows;
    }
const deleteClientSiteQuery = async (site) => {
    let res = await pool.query("DELETE FROM client_sites WHERE site = $1", [site]);
    return res.rows;
    }
const createClientSiteQuery = async (site, display_name) => {
    let res = await pool.query("INSERT INTO client_sites (site, display_name) VALUES ($1, $2) RETURNING *", [site, display_name]);
    return res.rows;
    }
const updateClientSiteDisplayNameQuery = async (site, display_name) => {
    let res = await pool.query("UPDATE client_sites SET display_name = $1 WHERE site = $2 RETURNING *", [display_name, site]);
    return res.rows;
    }


    // client_sites queries/ join queries 

    // get all sites by username
const getClientSitesByUsernameQuery = async (username) => {
    console.log('in query', username);
    let res = await pool.query("SELECT U.site, U.display_name as site_display_name, UT.user_username \
                            FROM user_sites as UT JOIN client_sites as U ON UT.client_site = U.site \
                            WHERE UT.user_username = $1", [username]);

                                                    
    console.log('res in query', res.rows);                             
                                    
    return res.rows;
    }


//-------------------NOT USER ---------------------
// get sites by username then get all users with those sites
const getUsersByClientSitesQuery = async (sites) => {
    let res = await pool.query("SELECT  U.username, UT.client_site, U.display_name as user_display_name FROM user_sites as UT JOIN users as U ON UT.user_username = U.username WHERE UT.client_site = ANY($1)", [sites]);
    return res.rows;
    }

// query that gets list of sites by username and list of users by sites
const getUsersWithSameSitesByClientSitesQuery = async (username) => {
    let res = await pool.query("SELECT  U.username, UT.client_site, U.display_name as user_display_name FROM user_sites as UT JOIN users as U ON UT.user_username = U.username WHERE UT.client_site IN (SELECT client_site FROM user_sites WHERE user_username = $1)", [username]);
    return res.rows;
    }

// query insert array sites for a user in user_sites table
const createUserSitesQuery = async (username, sites) => {
    let res = await pool.query("INSERT INTO user_sites (user_username, client_site) VALUES ($1, $2) RETURNING *", [username, sites]);
    return res.rows;
    }


module.exports = {getClientSitesByUsernameQuery ,getUsersQuery, getUserQuery, deleteUserQuery, createUserQuery, updatePasswordQuery, updateUserQuery, getClientSitesQuery, getClientSiteQuery, deleteClientSiteQuery, createClientSiteQuery, updateClientSiteDisplayNameQuery };
