---
layout: post
title: "Django tips: automating database tasks"
---

Learn how to access your Django models in an simple, independent Python script.

Django is not a minimal framework, it feels you can't escape its architecture, and not everything needs to be inside `view`, inside an `app`. There's a way to write standalone scripts, I usually use them to populate sample data in a development environment, so a new developer can clone the repository, run the populate script in order to have some basic data on his/her local server, in many cases a project will not work with an empty database, when configurations are stored in a model.

Recently I had to perform an automated task on a project, the idea was to update the prices of all products under a category, it could be possible to edit them manually in Django admin, but my client has over 200 products, doing it manually would be a tedious task, subject to human mistakes. In case of large scale projects, an automation script is really the only solution here.

Create a new Python script in the project root, next to `manage.py`:

```python
import django
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'MyProject.settings'
django.setup()
```

From now you can do anything you would do in a Django view, like create, retrieve, update and delete objects, just import your models:

```python
from your_app.models import MyModel

# create
row = MyModel(name='T-Shirt Batman', price=120)
row.save()
```

Let's say we want to update the prices of all our products that costs $120 to $150, but only for 'Batman' products:

```python
rows = MyModel.objects.filter(price=120)
for row in rows:
        if 'batman' in row.name.lower():
            row.price = 150
            row.save()
            print("Product updated: " + str(row.id))
```

Just test your script in a development environment before running it in production and you're ready to go, unless you like to live dangerously.

![_config.yml]({{ site.baseurl }}/images/blog/2.jpg)
