export default class Alumno {
    constructor(username, DNI, edad) { 
    this.username = username;
    this.DNI = DNI;
    this.edad = edad
    }
    getusername() {
    return this.username;
    }
    getDNI() {
    return this.DNI;
    }
    getEdad() {
    return this.edad;
    }
    toString(){
    return `Username:${this.username}, DNI:${this.DNI}, Edad:${this.edad}`;
    }
}