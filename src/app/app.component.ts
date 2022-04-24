import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Registration / Login';
  users: Array<String> = [];
  passwords: Array<String> = [];
  nameAndIds: Array<any> = [];
  username: String = "";
  password: String = "";
  status: String = "";

  add: Function = () => {
    //this.users.push(this.username);
    //this.passwords.push(this.password);
    this.postList()
      .then((data: any) => {
        this.loadUsers();
      })

    this.username = ""
    this.password = ""
  }

  deleteFunc: Function = (user: String) => {
    const index: number = this.users.indexOf(user);
    // this.users.splice(index, 1);
    // this.passwords.splice(index, 1);
    this.deleteItem(index)
      .then((data: any) => {
        this.loadUsers();
      })

  }

  getList: Function = () => {
    return fetch("http://localhost:8000/users", {
      method: "GET"
    }).then(response => {
      //console.log("response get: ", response.json());
      return response.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteItem: Function = (ind: any) => {
    return fetch(`http://localhost:8000/users/${this.nameAndIds[ind]._id}`, {
      method: "DELETE"
    }).then(response => {
      //console.log("response get: ", response.json());
      return response.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  updateController: Function = (ind: any) => {
    return fetch(`http://localhost:8000/users/${this.nameAndIds[ind]._id}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.username, password: this.password })
    }).then(response => {
      //console.log("response get: ", response.json());
      return response.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  updatePassword: Function = () => {
    const index: number = this.users.indexOf(this.username);
    console.log("put: ", index);
    this.updateController(index)
      .then((data: any) => {
        this.status = "Updated";
        this.loadUsers();
      })
  }

  postList: Function = () => {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.username, password: this.password })
    }).then(response => {
      //console.log("response post: ", response);
      response.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  loadUsers: Function = async () => {
    this.getList()
      .then((data: any) => {

        data = data.users;
        let n = data.length;

        this.users = [];
        this.passwords = [];
        this.nameAndIds = [];

        console.log(this.users.length);
        for (let i = 0; i < n; i++) {
          console.log(data[i].name, " ", data[i].password);
          this.users[i] = data[i].name;
          this.passwords[i] = data[i].password;
        }

        this.nameAndIds = data;

        //this.users = data.users;
        console.log("response get1: ", this.nameAndIds);
      })

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  check() {
    let n = this.users.length;

    for (let i = 0; i < n; i++) {
      if (this.username == this.users[i]) {
        console.log(this.username + " " + this.users[i])
        console.log(this.password + " " + this.passwords[i])
        if (this.password == this.passwords[i]) {
          this.status = "Logged In"
          return;
        } else {
          this.status = "Not Logged In: Incorrect Password"
          return;
        }
      }
    }
    this.status = "Not Logged In: User Not found"
    return;
  }
}
