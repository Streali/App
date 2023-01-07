// @ts-nocheck
import { createServer, Model, ActiveModelSerializer, belongsTo, hasMany } from 'miragejs';
import { uid } from 'uid';

export function setupMockServer(): void {
  if (import.meta.env.VITE_MOCK_API === 'true') {
    console.info('Mock server enabled');

    function generateGlobalFields() {
      return {
        created_at: new Date(),
        updated_at: new Date(),
        secret: uid(30),
      };
    }

    class IdentityManager {
      private ids: Set<string>;

      constructor() {
        this.ids = new Set();
      }

      fetch() {
        const id = uid();
        this.ids.add(id);
        return id;
      }

      set(id: string) {
        this.ids.add(id);
      }

      reset() {
        this.ids.clear();
      }
    }

    const ApplicationSerializer = ActiveModelSerializer.extend({
      root: false,
      embed: true,

      normalize(payload) {
        const payloadWithRoot = {
          [this.type]: payload,
        };

        return ActiveModelSerializer.prototype.normalize.call(this, payloadWithRoot);
      },
    });

    createServer({
      environment: 'development',

      identityManagers: {
        application: IdentityManager,
      },

      serializers: {
        application: ApplicationSerializer,
      },

      models: {
        user: Model.extend({
          chatThemes: hasMany(),
          events: hasMany(),
          eventLists: hasMany(),
          labels: hasMany(),
        }),
        chatTheme: Model.extend({
          user: belongsTo(),
        }),
        event: Model.extend({
          user: belongsTo(),
        }),
        eventList: Model.extend({
          user: belongsTo(),
        }),
        label: Model.extend({
          user: belongsTo(),
        }),
      },

      seeds(server) {
        server.create('user', {
          id: '424bfed8-c2eb-44b5-9fdb-f35f5cb24a41',
          username: 'Streali',
          avatar_url: 'https://i.pravatar.cc/300',
          email: 'streali@example.com',
          secret: 's3cr3t',
        });
      },

      routes() {
        this.urlPrefix = import.meta.env.VITE_API_URL;
        this.passthrough('https://www.googleapis.com/**');

        // Auth
        this.get('me', (schema) => schema.users.first());
        this.get('users/s3cr3t/labels-info', () => {
          return {
            latestFollower: {
              displayName: 'Streali Follower',
            },
            latestSubscriber: {
              displayName: 'Streali Subscriber',
            },
            subscriptionCount: {
              amount: 10,
            },
            viewerCount: {
              amount: 100,
            },
            followerCount: {
              amount: 1000,
            },
            latestCheerDonor: {
              displayName: 'Streali Cheer Donor',
              amount: 100,
            },
          };
        });

        // Events
        this.resource('events');

        // Chat themes
        this.resource('chat-themes', { only: ['index', 'show', 'delete'] });
        this.post('chat-themes', (schema, request) => {
          const attrs = JSON.parse(request.requestBody);
          const user = schema.users.first();

          return user.createChatTheme({ ...attrs, ...generateGlobalFields() });
        });
        this.put('chat-themes/:id', (schema, request) => {
          const attrs = JSON.parse(request.requestBody);
          const chatTheme = schema.chatThemes.find(request.params.id);

          return chatTheme.update(attrs);
        });
        this.post('chat-themes/:id/duplicate', (schema, request) => {
          const chatTheme = schema.chatThemes.find(request.params.id);
          const user = schema.users.first();
          const { id, ...attrs } = chatTheme.attrs;
          attrs.title = `${attrs.title} Copy`;

          return user.createChatTheme(attrs);
        });

        // Event lists
        this.resource('event-lists', { only: ['index', 'show', 'delete'] });
        this.post('event-lists', (schema, request) => {
          const attrs = JSON.parse(request.requestBody);
          const user = schema.users.first();

          return user.createEventList({ theme: attrs, ...generateGlobalFields() });
        });
        this.put('event-lists/:id', (schema, request) => {
          const attrs = JSON.parse(request.requestBody);
          const eventList = schema.eventLists.find(request.params.id);

          return eventList.update({ theme: attrs });
        });
        this.post('event-lists/:id/duplicate', (schema, request) => {
          const eventList = schema.eventLists.find(request.params.id);
          const user = schema.users.first();
          const { id, ...attrs } = eventList.attrs;
          attrs.theme.title = `${attrs.theme.title} Copy`;

          return user.createEventList(attrs);
        });

        // Labels
        this.resource('labels', { only: ['index', 'show', 'delete'] });
        this.post('labels', (schema, request) => {
          const { title, ...attrs } = JSON.parse(request.requestBody);
          const user = schema.users.first();

          return user.createLabel({ title, theme: attrs, ...generateGlobalFields() });
        });
        this.put('labels/:id', (schema, request) => {
          const { title, ...attrs } = JSON.parse(request.requestBody);
          const label = schema.labels.find(request.params.id);

          return label.update({ title, theme: attrs });
        });
        this.post('labels/:id/duplicate', (schema, request) => {
          const label = schema.labels.find(request.params.id);
          const user = schema.users.first();
          const { id, ...attrs } = label.attrs;
          attrs.title = `${attrs.title} Copy`;

          return user.createLabel(attrs);
        });
      },
    });
  }
}
