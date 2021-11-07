from django.db import models

# Create your models here.


class TheMovieDBConfiguration(models.Model):
    smallestImageSize = models.TextField()
    baseURL = models.TextField()
    dateRetrieved = models.DateTimeField()