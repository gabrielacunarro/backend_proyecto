class SessionDTO {
    constructor(data) {
        this.sid = data.sid; 
        this.uid = data.uid; 
        this.createdAt = new Date(); 
        this.expiresAt = data.expiresAt; 
        this.token = data.token; 
    }
}

export default SessionDTO;


