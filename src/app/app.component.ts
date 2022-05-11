import { Component } from '@angular/core';
import { Profile } from './Profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Registration / Login';
  users: Array<Profile> = [];
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

  deleteFunc: Function = (user: Profile) => {
    let index: number = -1;

    for (let i: number = 0; i < this.users.length; i++) {
      if (this.users[i].name == user.name) {
        index = i;
        break;
      }
    }

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
    return fetch(`http://localhost:8000/users/${this.users[ind].id}`, {
      method: "DELETE"
    }).then(response => {
      //console.log("response get: ", response.json());
      return response.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  updateController: Function = (ind: any) => {
    return fetch(`http://localhost:8000/users/${this.users[ind].id}`, {
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

    let index: number = -1;

    for (let i: number = 0; i < this.users.length; i++) {
      if (this.users[i].name == this.username) {
        index = i;
        break;
      }
    };

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

        console.log(this.users.length);
        for (let i = 0; i < n; i++) {
          console.log(data[i].name, " ", data[i].password);
          this.users[i] = { name: data[i].name, password: data[i].password, id: data[i]._id };
        }

        //this.users = data.users;
        console.log("response get1: ", this.users);
      })

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  check() {
    let n = this.users.length;

    for (let i = 0; i < n; i++) {
      if (this.username == this.users[i].name) {
        console.log(this.username + " " + this.users[i])
        if (this.password == this.users[i].password) {
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
