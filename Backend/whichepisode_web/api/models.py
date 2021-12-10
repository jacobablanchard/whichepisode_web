from django.db import models

# Create your models here.


class TheMovieDBConfiguration(models.Model):
    smallestImageSize = models.TextField()
    bestPosterSize = models.TextField()
    still_size = models.TextField()
    baseURL = models.TextField()
    dateRetrieved = models.DateTimeField()
    