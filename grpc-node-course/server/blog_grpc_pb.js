// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var blog_pb = require('./blog_pb.js');

function serialize_blog_CreateBlogRequest(arg) {
  if (!(arg instanceof blog_pb.CreateBlogRequest)) {
    throw new Error('Expected argument of type blog.CreateBlogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_CreateBlogRequest(buffer_arg) {
  return blog_pb.CreateBlogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_CreateBlogResponse(arg) {
  if (!(arg instanceof blog_pb.CreateBlogResponse)) {
    throw new Error('Expected argument of type blog.CreateBlogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_CreateBlogResponse(buffer_arg) {
  return blog_pb.CreateBlogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_DeleteBlogRequest(arg) {
  if (!(arg instanceof blog_pb.DeleteBlogRequest)) {
    throw new Error('Expected argument of type blog.DeleteBlogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_DeleteBlogRequest(buffer_arg) {
  return blog_pb.DeleteBlogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_DeleteBlogResponse(arg) {
  if (!(arg instanceof blog_pb.DeleteBlogResponse)) {
    throw new Error('Expected argument of type blog.DeleteBlogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_DeleteBlogResponse(buffer_arg) {
  return blog_pb.DeleteBlogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_ListBlogRequest(arg) {
  if (!(arg instanceof blog_pb.ListBlogRequest)) {
    throw new Error('Expected argument of type blog.ListBlogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_ListBlogRequest(buffer_arg) {
  return blog_pb.ListBlogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_ListBlogResponse(arg) {
  if (!(arg instanceof blog_pb.ListBlogResponse)) {
    throw new Error('Expected argument of type blog.ListBlogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_ListBlogResponse(buffer_arg) {
  return blog_pb.ListBlogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_ReadBlogRequest(arg) {
  if (!(arg instanceof blog_pb.ReadBlogRequest)) {
    throw new Error('Expected argument of type blog.ReadBlogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_ReadBlogRequest(buffer_arg) {
  return blog_pb.ReadBlogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_ReadBlogResponse(arg) {
  if (!(arg instanceof blog_pb.ReadBlogResponse)) {
    throw new Error('Expected argument of type blog.ReadBlogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_ReadBlogResponse(buffer_arg) {
  return blog_pb.ReadBlogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_UpdateBlogRequest(arg) {
  if (!(arg instanceof blog_pb.UpdateBlogRequest)) {
    throw new Error('Expected argument of type blog.UpdateBlogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_UpdateBlogRequest(buffer_arg) {
  return blog_pb.UpdateBlogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blog_UpdateBlogResponse(arg) {
  if (!(arg instanceof blog_pb.UpdateBlogResponse)) {
    throw new Error('Expected argument of type blog.UpdateBlogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blog_UpdateBlogResponse(buffer_arg) {
  return blog_pb.UpdateBlogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BlogsService = exports.BlogsService = {
  listBlog: {
    path: '/blog.Blogs/ListBlog',
    requestStream: false,
    responseStream: true,
    requestType: blog_pb.ListBlogRequest,
    responseType: blog_pb.ListBlogResponse,
    requestSerialize: serialize_blog_ListBlogRequest,
    requestDeserialize: deserialize_blog_ListBlogRequest,
    responseSerialize: serialize_blog_ListBlogResponse,
    responseDeserialize: deserialize_blog_ListBlogResponse,
  },
  createblog: {
    path: '/blog.Blogs/Createblog',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.CreateBlogRequest,
    responseType: blog_pb.CreateBlogResponse,
    requestSerialize: serialize_blog_CreateBlogRequest,
    requestDeserialize: deserialize_blog_CreateBlogRequest,
    responseSerialize: serialize_blog_CreateBlogResponse,
    responseDeserialize: deserialize_blog_CreateBlogResponse,
  },
  readBlog: {
    path: '/blog.Blogs/ReadBlog',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.ReadBlogRequest,
    responseType: blog_pb.ReadBlogResponse,
    requestSerialize: serialize_blog_ReadBlogRequest,
    requestDeserialize: deserialize_blog_ReadBlogRequest,
    responseSerialize: serialize_blog_ReadBlogResponse,
    responseDeserialize: deserialize_blog_ReadBlogResponse,
  },
  updateBlog: {
    path: '/blog.Blogs/UpdateBlog',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.UpdateBlogRequest,
    responseType: blog_pb.UpdateBlogResponse,
    requestSerialize: serialize_blog_UpdateBlogRequest,
    requestDeserialize: deserialize_blog_UpdateBlogRequest,
    responseSerialize: serialize_blog_UpdateBlogResponse,
    responseDeserialize: deserialize_blog_UpdateBlogResponse,
  },
  deleteBlog: {
    path: '/blog.Blogs/DeleteBlog',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.DeleteBlogRequest,
    responseType: blog_pb.DeleteBlogResponse,
    requestSerialize: serialize_blog_DeleteBlogRequest,
    requestDeserialize: deserialize_blog_DeleteBlogRequest,
    responseSerialize: serialize_blog_DeleteBlogResponse,
    responseDeserialize: deserialize_blog_DeleteBlogResponse,
  },
};

exports.BlogsClient = grpc.makeGenericClientConstructor(BlogsService);
