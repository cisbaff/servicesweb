from django.db import models
from datetime import datetime
from django.urls import reverse


class Archive(models.Model):
    name = models.CharField('Identificador do Arquivo', max_length=100, blank=True)
    archive = models.FileField(upload_to='files/')
    
    def __str__(self) -> str:
        return self.archive.name


class Register(models.Model):
    identifier = models.CharField('Identificador', max_length=100)
    data_json = models.CharField('Dados em JSON', max_length=1000)
    archives = models.ManyToManyField(Archive)
    status = models.CharField(max_length=100, default="analise", choices=(("analise", "Em analise"), ("deferido", "Deferido"), ("indeferido", "Indeferido")))
    response = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=datetime.now(), blank=True, null=True)
    html = None

    def __str__(self) -> str:
        return self.identifier
