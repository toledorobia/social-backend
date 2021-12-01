import * as yup from 'yup';

export const createSchema = yup.object({
  body: yup.object({
    name: yup.string().required().label('Name'),
    description: yup.string().required().label('Description'),
    price: yup.number().required().label('Price'),
    quantity: yup.number().integer().required().label('Quantity'),
    categories: yup.array().of(yup.string().required().label('Category')),
  })
});

export const updateSchema = yup.object({
  body: yup.object({
    id: yup.string().required().label('Id'),
    name: yup.string().label('Name'),
    description: yup.string().label('Description'),
    price: yup.number().label('Price'),
    quantity: yup.number().integer().label('Quantity'),
    categories: yup.array().of(yup.string().required().label('Category')),
  })
});

