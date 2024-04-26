from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Register, Archive
from .controler.generate_html import GenerateHTML
import json

def index(request):
    return render(request, 'crur.html')

def crur_open(request):
    return render(request, 'crur_open.html')

def crur_check(request, term=None):
    context = {'term': term}
    if term:
        context['registers'] = Register.objects.filter(identifier=term)
    return render(request, 'crur_check.html', context=context)

@csrf_exempt
def crur_response(request, term=None):

    if request.method == "GET":
        context = {'term': term}
        registers = None
        if term:
            if term == "analise":
                registers = Register.objects.filter(status="analise")
            else:
                registers = Register.objects.filter(identifier=term)
        else:
            registers = Register.objects.all()
        context['registers'] = [GenerateHTML.generate(r) for r in registers]
        return render(request, 'crur_response.html', context=context)
    
    elif request.method == "POST":
        pk = request.POST.get('pk')
        response = request.POST.get('response')
        select = request.POST.get('select')

        register = Register.objects.get(pk=pk)
        register.status = select
        register.response = response
        register.save()
        
        return redirect('/crur/response')

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data_json_str = request.POST.get('data_json')
            data_json = json.loads(data_json_str)
            identifier = data_json['Dados do solicitante']['CPF']
            register_instance = Register(identifier=identifier, data_json=data_json_str)
            register_instance.save()
            images = []
            for i in range(2):
                try:
                    file = request.FILES[f'file{i}']
                    name = str(file.name).split('-DIV-')[0].replace('_', ' ')
                    images.append(Archive.objects.create(name=name, archive=file))
                except:
                    pass
            register_instance.archives.set(images)
            message = f"Solicitação realizada! para acompanhar a solicitação acesse o menu de acompanhamento e utilize o cpf do solicitante, CPF com final *********{identifier[-2:]}"
            return JsonResponse({"message": message, "identifier": identifier})
        except Exception as e:
            print(e)
            return JsonResponse({"message": str(e)}, status=400)
 
    return JsonResponse({"erorr": "not foi possivel processar sua requisição, clique no bott on"})
        
