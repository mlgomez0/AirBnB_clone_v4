#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity
"""
from models.state import State
from models.city import City
from models.user import User
from models.place import Place
from models.amenity import Amenity
import models

# creation of a State
state = State(name="antioquia")
state.save()

# creation of a City
city = City(state_id=state.id, name="medallo")
city.save()

# creation of a User
user = User(email="mary@pretty.com", password="mary123")
user.save()

# creation of 2 Places
place_1 = Place(user_id=user.id, city_id=city.id, name="envigado")
place_1.save()

# creation of 3 various Amenity
amenity_1 = Amenity(name="perro q orina mandandolo")
amenity_1.save()


# link place_1 with 2 amenities
place_1.amenities.append(amenity_1)

models.storage.save()

print("OK")
