"""
Django settings for whichepisode_web project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
#from django.core.management.commands.runserver import Command as runserver

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!
try:
    _ = os.environ["DJANGO_DEBUG"]
    print("Starting with DEBUG logging config")
    DEBUG = True
    SECRET_KEY = 'django-insecure-ki6prx(=ud3c2df13#y-2tg$2klp!1j@6=bz$awz2tn*g$4e#4'
    myDebugLevel = "DEBUG"
except KeyError:
    print("Starting with INFO logging config")
    DEBUG = False
    myDebugLevel = "INFO"
    try:
        _ = os.environ["DJANGO_DEBUG_PROD"]
        print("Production debug")
        SECRET_KEY = 'django-insecure-ki6prx(=ud3c2df13#y-2tg$2klp!1j@6=bz$awz2tn*g$4e#4'
    except KeyError:
        print("Production")
        #print(os.environ)
        SECRET_KEY = os.environ["SECRET_KEY"]
        if SECRET_KEY is None or SECRET_KEY == "":
            raise EnvironmentError("Where's my secret key, dude?")
        #ALLOWED_HOSTS = ['*']
        #runserver.default_port = os.environ["PORT"]
        #runserver.default_addr = '0.0.0.0'
        #SECURE_SSL_REDIRECT = True
        #CSRF_COOKIE_SECURE = True
        #SESSION_COOKIE_SECURE = True


ALLOWED_HOSTS =  ['which-episode.onrender.com', 'localhost', '127.0.0.1', 'whichepisode.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'whitenoise.runserver_nostatic',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'rest_framework',
    'drf_spectacular',
    'corsheaders'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'whichepisode_web.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "build")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_DIRS = [
  # Tell Django where to look for React's static files (css, js)
  os.path.join(BASE_DIR, "build/static"),
]

WSGI_APPLICATION = 'whichepisode_web.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'WhichEpisode',
    'DESCRIPTION': 'lol my description',
    'VERSION': '1.0.0',
    # OTHER SETTINGS
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "http://whichepisode.herokuapp.com",
    "https://whichepisode.herokuapp.com",
    "http://which-episode.onrender.com",
    "https://which-episode.onrender.com",
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
     "formatters":
    {
      "basic":
      {
        "format": "[%(asctime)s] - %(name)s - %(levelname)s - %(message)s",
        "datefmt": "%d/%b/%Y %H:%M:%S"
      },
      "verbose":
      {
        "format": "%(asctime)s - %(pathname)-17s line:%(lineno)-4d - %(levelname)-8s - %(message)s"
      }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'basic'
        },
    },
    'root': {
        'handlers': ['console'],
        'level': myDebugLevel,
    },
}

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
