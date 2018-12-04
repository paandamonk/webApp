const api_root = "http://localhost:80/users";
export let userId = null;

export function register(username, FBuserId){
    return myFetch(api_root + "/", {username: username, userId: FBuserId});
}
export function getUser(userId){
    return myFetch(api_root + "/" + userId);
}
export function getUsers(){
    return myFetch(api_root + "/");
}
export function getCurrentUser(){
    return myFetch(api_root + "/mainuser");
}
export function addExercise(userId, type, time, duration){
    return myFetch(api_root + "/" + userId + "/exercises", {type,time,duration});
}
export function addGoal(userId, type, value){
    return myFetch(api_root + "/" + userId + "/goals", {type: type, value: value});
}
export function Login(username, fbid, access_token){
    return myFetch(api_root + "/", { username: username, fbid: fbid, access_token: access_token });
            //.then(x=> userId = x.id);
}   

export function addFriend(userId, friendUser){
    return myFetch(api_root + "/" + userId + "/friends", {username: friendUser});
}
export function getFriends(){
    return myFetch(api_root + "/mainuser" + "/friends");
}
export function GetState(){
    return myFetch(api_root + "/");
}





  function myFetch(url = ``, data = null) {
      let options = {
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                userId: userId
            }
      };
      if(data){
          options = { 
            ...options,
            method:  "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                ...options.headers,
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          };
      }
      return fetch(url, options)
      .then(response =>{
        return response.json();
      }); // parses response to JSON
  }