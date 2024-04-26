from crur.models import Register
import json, os
from django.conf import settings


class GenerateHTML:

    @classmethod
    def generate(cls, register: Register):
        html = ''
        data_json = json.loads(register.data_json)
        for key in data_json:
            html += f"""
                <h5>{key}</h5>
                <div class="d-flex flex-column m-3">
            """
            for field, value in data_json[key].items():
                html += f"""
                    <label><b>{field}:</b> {value}</label>
                """
            html += "</div>"
        html += f"""
        <hr>
        <h5>Anexos</h5>
        <div class="d-flex flex-row flex-wrap">
        """
        
        for archive in register.archives.all():
            path = os.path.join(settings.MEDIA_URL, str(archive))
            name = str(archive).split('/')[1]
            html += f"""
           <div class="card">
            <div class="card-body">
                <h5 class="card-title">{archive.name}</h5>
                <p class="card-text">{name}</p>
                <a href="{path}" target="_blank" class="btn btn-primary">Visualizar</a>
            </div>
            </div>
            """
        r = ''
        if register.response:
            r = register.response

        html += f"""
        </div>
        <hr>
        <form action="/crur/response" method="POST" class="d-flex flex-column" style="gap:10px;">
            <input name="pk" value="{register.pk}" style="display:none;">
            <h5>Resposta da Solicitação</h5>
            <textarea name="response" rows="4">{r}</textarea>
            <select name="select" class="form-select" >
        """

        for options in register._meta.get_field('status').choices:
            if register.status == options[0]:
                html += f'<option value="{options[0]}" selected>{options[1]}</option>'
            else:
                html += f'<option value="{options[0]}">{options[1]}</option>'

        html += f"""
            </select>
            <input type="submit" value="Atualizar" class="btn btn-primary">
        </form>
        """

        register.html = html
        return register