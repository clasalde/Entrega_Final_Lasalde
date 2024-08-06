class UserAdminDto {
  constructor({ first_name, last_name, rol, email, _id, documents }) {
    this._id = _id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.rol = rol;
    this.email = email;
    this.documents = documents;
  }
}

module.exports = UserAdminDto;