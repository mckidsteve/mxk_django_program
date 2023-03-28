from django.http import JsonResponse
from dj_web.models.player.player import Player

def getinfo_web(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result' : "success",
        'username' : player.user.username,
        'photo' : player.photo,
    })

def getinfo(request):
    platform = request.GET.get('platform')
    if platform == "WEB":
        return getinfo_web(request)