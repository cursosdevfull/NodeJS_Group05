from locust import TaskSet, HttpLocust, task 
import json

class UserBehavior1(TaskSet):
  def on_start(self):
    response = self.client.post("/auth/login", {"email": "sergio@correo.com", "password": "123"})
    self.accessToken = response.json()["accessToken"]

  @task(6)
  def list_users(self):
    self.client.get("/users", headers={"Authorization": "Bearer {}".format(self.accessToken)})

  @task(2)
  def list_one_user(self):
    self.client.get("/users/1", headers={"Authorization": "Bearer {}".format(self.accessToken)})


class UserBehavior2:
  def on_start(self):
    response = self.client.post("/auth/login", {"email": "sergio@correo.com", "password": "123"})
    self.accessToken = response.json()["accessToken"]

  @task(3)
  def list_users(self):
    self.client.get("/users", headers={"Authorization": "Bearer {}".format(self.accessToken)})

  @task(8)
  def list_one_user(self):
    self.client.get("/users/1", headers={"Authorization": "Bearer {}".format(self.accessToken)})


class Test1(HttpLocust):
  task_set = UserBehavior1
  min_wait = 2000
  max_wait = 3000

class Test2(HttpLocust):
  task_set = UserBehavior2
  min_wait = 1000
  max_wait = 4000