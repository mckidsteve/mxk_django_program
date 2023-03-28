from django.db import models
from django.contrib.auth.models import User

class Player(models.Model): # extends by class models.Model
    user = models.OneToOneField(User,on_delete=models.CASCADE) # Player从User扩充,这里代表Player对应唯一的User , ondelete用于删除时一起删掉
    photo = models.URLField(max_length=128,blank=True) # 头像photo的URL,maxlen最大连接长度,blank是否可空

    def __str__(self):
        return str(self.user)