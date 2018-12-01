import {
  Count,
  CountSchema,
  Filter,
  repository, RepositoryMixin,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Evento, Usuario} from '../models';
import {EventoRepository, UsuarioRepository} from '../repositories';
import {inject} from '@loopback/context';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';

export class EventoController {
  constructor( 
    @repository(EventoRepository)
    public eventoRepository : EventoRepository,
  ) {}

  @authenticate('user')
  @get('/eventos/{id}/usuario')
    async getUsuario(
    @param.path.string('id') eventoId: typeof Evento.prototype.id,
  ): Promise<Usuario> {
    return await this.eventoRepository.usuario(eventoId);
  }

  @authenticate('user')
  @post('/eventos', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: {'application/json': {schema: {'x-ts-type': Evento}}},
      },
    },
  })
  async create(@requestBody() evento: Evento): Promise<Evento> {
    return await this.eventoRepository.create(evento);
  }

  @authenticate('user')
  @get('/eventos/count', {
    responses: {
      '200': {
        description: 'Evento model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where,
  ): Promise<Count> {
    return await this.eventoRepository.count(where);
  }

  @authenticate('user')
  @get('/eventos', {
    responses: {
      '200': {
        description: 'Array of Evento model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Evento}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Evento)) filter?: Filter,
  ): Promise<Evento[]> {
    return await this.eventoRepository.find(filter);
  }

  @authenticate('user')
  @patch('/eventos', {
    responses: {
      '200': {
        description: 'Evento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() evento: Evento,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where,
  ): Promise<Count> {
    return await this.eventoRepository.updateAll(evento, where);
  }

  @authenticate('cop')
  @get('/eventos/{id}', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: {'application/json': {schema: {'x-ts-type': Evento}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Evento> {
    return await this.eventoRepository.findById(id);
  }

  @authenticate('user')
  @patch('/eventos/{id}', {
    responses: {
      '204': {
        description: 'Evento PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() evento: Evento,
  ): Promise<void> {
    await this.eventoRepository.updateById(id, evento);
  }

  @authenticate('owner')
  @del('/eventos/{id}', {
    responses: {
      '204': {
        description: 'Evento DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventoRepository.deleteById(id);
  }
}
