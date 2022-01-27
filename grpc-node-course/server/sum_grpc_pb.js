// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var sum_pb = require('./sum_pb.js');

function serialize_calculator_PrimeNumberDecompositionRequest(arg) {
  if (!(arg instanceof sum_pb.PrimeNumberDecompositionRequest)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionRequest(buffer_arg) {
  return sum_pb.PrimeNumberDecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionResponse(arg) {
  if (!(arg instanceof sum_pb.PrimeNumberDecompositionResponse)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionResponse(buffer_arg) {
  return sum_pb.PrimeNumberDecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof sum_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return sum_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof sum_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return sum_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: sum_pb.SumRequest,
    responseType: sum_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  primeNumberDecomposition: {
    path: '/calculator.CalculatorService/PrimeNumberDecomposition',
    requestStream: false,
    responseStream: true,
    requestType: sum_pb.PrimeNumberDecompositionRequest,
    responseType: sum_pb.PrimeNumberDecompositionResponse,
    requestSerialize: serialize_calculator_PrimeNumberDecompositionRequest,
    requestDeserialize: deserialize_calculator_PrimeNumberDecompositionRequest,
    responseSerialize: serialize_calculator_PrimeNumberDecompositionResponse,
    responseDeserialize: deserialize_calculator_PrimeNumberDecompositionResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
