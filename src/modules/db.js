import token from './token';

const api = 'https://localhost:7097/api';

const db_get = async (url) => {
    let results = {};
    await fetch(url, {
        method: 'get',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_post = async (url, body) => {
    if(!body) {
        return undefined;
    }

    let results = {};
    await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_put = async (url, body) => {
    if(!body) {
        return undefined;
    }

    let results = {};
    await fetch(url, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_remove = async (url, body) => {
    let results = {};
    await fetch(url, {
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + token.getToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body && JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_uploadFiles = async (url, files) => {
    if(!files) {
        return undefined;
    }

    let results = {};
    const formData = new FormData();
    formData.append('title', 'files');

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    
    await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        },
        body: formData
    })
    .then(response => response.json())
    .then(response => {
    if(response.token) {
        token.setToken(response.token);
    }
    
    results = response;
    })
    .catch((e) => {
        results = undefined;
    });
    
    return results;
}

const db_removeFiles = async (url, files) => {
    if(!files) {
        return undefined;
    }

    let results = {};
    await fetch(url, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(files),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const Subscriptions = function() {
    this.url = `${api}/subscriptions`;
    
    this.get = async function() {
        return await db_get(this.url);
    }
}

const Bans = function() {
    this.url = `${api}/bans`;
    
    this.get = async function() {
        return await db_get(this.url);
    }
}

const Users = function() {
    this.url = `${api}/users`;
    
    this.get = async function() {
        return await db_get(this.url);
    }

    this.getProfile = async function() {
        return await db_get(`${ this.url }/profile`);
    }

    this.update = async function(item) {
        if(!item) {
            return undefined;
        }
        return await db_put(this.url, item);
    }

    this.ban = async function(id, ban) {
        if(!id) {
            return undefined;
        }
        if(ban) {
            return await db_remove(`${this.url}/${id}`, ban);
        }
        return await db_put(`${this.url}/unban/${id}`, {});
    }
}

const Shoppings = function() {
    this.url = `${api}/shoppings`;
    
    this.get = async function(id) {
        if(id) {
            return await db_get(`${ this.url }/${ id }`);
        }
        return await db_get(this.url);
    }

    this.create = async function(entity) {
        if(!entity) {
            return undefined;
        }

        return await db_post(this.url, entity);
    }
}

const Requests = function () {
    this.url = `${api}/requests`;
    
    this.get = async function() {
        return await db_get(this.url);
    }

    this.createText = async function(request) {
        if(!request) {
            return undefined;
        }
        
        return await db_post(this.url, request);
    }

    this.imageText = async function(request) {
        if(!request) {
            return undefined;
        }

        //uploadfile
        //get response
        
        return await db_post(this.url, request);
    }
}

const Rekoginition = function () {
    this.url = `${api}/files`;
    
    this.image = async function(request) {
        if(!request) {
            return undefined;
        }

        const res = await db_uploadFiles(this.url, [request]);
        if(!res){
            return undefined;
        } 

        return res;
    }

    this.voice = async function(file, lang) {
        if(!file) {
            return undefined;
        }

        if(!lang) {
            return await db_uploadFiles(this.url, [file]);
        }        
        return await db_uploadFiles(`${ this.url }?lang=${ lang }`, [file]);
    }
}

const Files = function() {
    this.get = async function(file) {
        if(file) {
            return await db_get(`${api}/files/file?file=${file}`);
        }

        return await db_get(`${api}/files`);
    }

    this.remove = async function (files) {
        return await db_removeFiles(`${api}/files`, files);
    }
}

//========= Authorization ====================
const signIn = async (login, password) => {
    return await db_post(`${api}/auth`, { userName: login, password: password });
}

const signUp = async (login, password) => {
    return await db_post(`${api}/auth/user`, { userName: login, password: password });
}
//============================================

const functions = {
    signIn: signIn,
    signUp: signUp,
    Subscriptions: new Subscriptions(),
    Users: new Users(),
    Bans: new Bans(),
    Shoppings: new Shoppings(),
    Requests: new Requests(),
    Rekoginition: new Rekoginition(),
    Files: new Files()
};

export default functions;