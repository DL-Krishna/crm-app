const leadResponse = {
  id: {
    type: 'integer',
    example: 1,
  },
  name: {
    type: 'string',
    example: 'Manideep',
  },
  leadSource: {
    type: 'string',
    example: 'Website',
  },
  countryCode: {
    type: 'string',
    example: '+1',
  },
  techStack: {
    type: 'string',
    example: 'Node.js',
  },
  phone: {
    type: 'string',
    example: '8686897800',
  },
  courseId: {
    type: 'integer',
    example: 1,
  },
  email: {
    type: 'string',
    example: 'manideep4658@gmail.com',
  },
  classMode: {
    type: 'string',
    example: 'Online',
  },
  feeQuoted: {
    type: 'string',
    example: '$500',
  },
  batchTiming: {
    type: 'string',
    example: 'Morning',
  },
  userId: {
    type: 'integer',
    example: 1,
  },
};

const createLeadBody = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Manideep',
    },
    leadSource: {
      type: 'string',
      example: 'Website',
    },
    countryCode: {
      type: 'string',
      example: '+1',
    },
    techStack: {
      type: 'string',
      example: 'Node.js',
    },
    phone: {
      type: 'string',
      example: '8686897800',
    },
    courseId: {
      type: 'integer',
      example: 1,
    },
    email: {
      type: 'string',
      example: 'manideep4658@gmail.com',
    },
    classMode: {
      type: 'string',
      example: 'Online',
    },
    feeQuoted: {
      type: 'string',
      example: '$500',
    },
    batchTiming: {
      type: 'string',
      example: 'Morning',
    },
    userId: {
      type: 'integer',
      example: 1,
    },
  },
};

const updateLeadBody = createLeadBody;

const unauthorizedResponse = {
  description: 'Unauthorized: No token provided',
  content: {
      'application/json': {
          schema: {
              type: 'object',
              properties: {
                  message: {
                      type: 'string',
                      example: 'Unauthorized: No token provided',
                  },
              },
          },
      },
  },
};

const leadNotFound = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Lead not found',
          },
        },
      },
    },
  },
};

const internalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal server error',
          },
          error: {
            type: 'string',
            example: 'Error message goes here',
          },
        }
      },
    },
  },
};

const security = [
  {
    bearerAuth: [],
  },
];

const leads = {
  tags: ['Leads'],
  description: 'Retrieve all the leads',
  operationId: 'getLeads',
  security: security, // Include security here
  responses: {
    '200': {
      description: 'Leads retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: leadResponse,
            },
          },
        },
      },
    },
    '401': unauthorizedResponse,
    '500': internalServerError,
  },
};

const getLead = {
  tags: ['Leads'],
  description: 'Retrieve one lead',
  operationId: 'getLead',
  security: security, // Include security here
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Lead ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '200': {
      description: 'Lead retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: leadResponse,
          },
        },
      },
    },
    '401': unauthorizedResponse,
    '404': leadNotFound,
    '500': internalServerError,
  },
};

const getLeads = {
  tags: ['Leads'],
  description: 'Retrieve leads with optional filtering by query parameters',
  operationId: 'getLeads',
  security: security, // Include security here
  parameters: [
    {
      name: 'userId',
      in: 'query',
      description: 'Filter leads by user ID',
      required: false,
      type: 'integer',
    },
    {
      name: 'fromDate',
      in: 'query',
      description: 'Filter leads created from this date (ISO string format)',
      required: false,
      type: 'string',
      format: 'date-time',
    },
    {
      name: 'toDate',
      in: 'query',
      description: 'Filter leads created until this date (ISO string format)',
      required: false,
      type: 'string',
      format: 'date-time',
    },
    {
      name: 'techStack',
      in: 'query',
      description: 'Filter leads by tech stack',
      required: false,
      type: 'string',
    },
    {
      name: 'leadSource',
      in: 'query',
      description: 'Filter leads by lead source',
      required: false,
      type: 'string',
    },
    {
      name: 'courseId',
      in: 'query',
      description: 'Filter leads by course ID',
      required: false,
      type: 'integer',
    },
  ],
  responses: {
    '200': {
      description: 'Leads retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: leadResponse,
            },
          },
        },
      },
    },
    '401': unauthorizedResponse,
    '500': internalServerError,
  },
};

const createLead = {
  tags: ['Leads'],
  description: 'Create a new lead in the system',
  operationId: 'createLead',
  security: security, // Include security here
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createLeadBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Lead created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: leadResponse,
          },
        },
      },
    },
    '401': unauthorizedResponse,
    '500': internalServerError,
  },
};

const updateLead = {
  tags: ['Leads'],
  description: 'Update a lead',
  operationId: 'updateLead',
  security: security, // Include security here
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Lead ID',
      required: true,
      type: 'string',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/updateLeadBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Lead updated successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: leadResponse,
          },
        },
      },
    },
    '401': unauthorizedResponse,
    '404': leadNotFound,
    '500': internalServerError,
  },
};

const deleteLead = {
  tags: ['Leads'],
  description: 'Delete a lead',
  operationId: 'deleteLead',
  security: security, // Include security here
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Lead ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '200': {
      description: 'Lead deleted successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Lead deleted successfully!',
              },
            },
          },
        },
      },
    },
    '401': unauthorizedResponse,
    '500': internalServerError,
  },
};

export {
  leads,
  getLead,
  getLeads,
  createLead,
  createLeadBody,
  updateLeadBody,
  updateLead,
  deleteLead,
};