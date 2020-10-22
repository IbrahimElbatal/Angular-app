export class User{

    constructor(
        public email:string,
        public id :string,
        private _token:string,
        private _expirationDate :Date
    ) {}
    
    static createUser(object:{id,email,_token,_expirationDate}){
        return new User(object.email,object.id,object._token,new Date(object._expirationDate));
    }
    get token(){
        if(!this._expirationDate || this._expirationDate< new Date())
            return null;

        return this._token;        
    }
    get expiresIn(){
        return this._expirationDate.getTime() -new Date().getTime();
    }
}