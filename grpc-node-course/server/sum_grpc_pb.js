// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var sum_pb = require('./sum_pb.js');

function serialize_calculator_ComputeAverageRequest(arg) {
  if (!(arg instanceof sum_pb.ComputeAverageRequest)) {
    throw new Error('Expected argument of type calculator.ComputeAverageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageRequest(buffer_arg) {
  return sum_pb.ComputeAverageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_ComputeAverageResponse(arg) {
  if (!(arg instanceof sum_pb.ComputeAverageResponse)) {
    throw new Error('Expected argument of type calculator.ComputeAverageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageResponse(buffer_arg) {
  return sum_pb.ComputeAverageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumRequest(arg) {
  if (!(arg instanceof sum_pb.FindMaximumRequest)) {
    throw new Error('Expected argument of type calculator.FindMaximumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumRequest(buffer_arg) {
  return sum_pb.FindMaximumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumResponse(arg) {
  if (!(arg instanceof sum_pb.FindMaximumResponse)) {
    throw new Error('Expected argument of type calculator.FindMaximumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumResponse(buffer_arg) {
  return sum_pb.FindMaximumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

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

function serialize_calculator_SquareRootRequest(arg) {
  if (!(arg instanceof sum_pb.SquareRootRequest)) {
    throw new Error('Expected argument of type calculator.SquareRootRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SquareRootRequest(buffer_arg) {
  return sum_pb.SquareRootRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SquareRootResponse(arg) {
  if (!(arg instanceof sum_pb.SquareRootResponse)) {
    throw new Error('Expected argument of type calculator.SquareRootResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SquareRootResponse(buffer_arg) {
  return sum_pb.SquareRootResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  // UNARY API
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
  // ERROR HANDLING SAMPLE
squareRoot: {
    path: '/calculator.CalculatorService/SquareRoot',
    requestStream: false,
    responseStream: false,
    requestType: sum_pb.SquareRootRequest,
    responseType: sum_pb.SquareRootResponse,
    requestSerialize: serialize_calculator_SquareRootRequest,
    requestDeserialize: deserialize_calculator_SquareRootRequest,
    responseSerialize: serialize_calculator_SquareRootResponse,
    responseDeserialize: deserialize_calculator_SquareRootResponse,
  },
  // SERVER STREAM API
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
  // CLIENT STREAM API
computeAverage: {
    path: '/calculator.CalculatorService/ComputeAverage',
    requestStream: true,
    responseStream: false,
    requestType: sum_pb.ComputeAverageRequest,
    responseType: sum_pb.ComputeAverageResponse,
    requestSerialize: serialize_calculator_ComputeAverageRequest,
    requestDeserialize: deserialize_calculator_ComputeAverageRequest,
    responseSerialize: serialize_calculator_ComputeAverageResponse,
    responseDeserialize: deserialize_calculator_ComputeAverageResponse,
  },
  // BIDIRECTIONAL STREAM API
findMaximum: {
    path: '/calculator.CalculatorService/FindMaximum',
    requestStream: true,
    responseStream: true,
    requestType: sum_pb.FindMaximumRequest,
    responseType: sum_pb.FindMaximumResponse,
    requestSerialize: serialize_calculator_FindMaximumRequest,
    requestDeserialize: deserialize_calculator_FindMaximumRequest,
    responseSerialize: serialize_calculator_FindMaximumResponse,
    responseDeserialize: deserialize_calculator_FindMaximumResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
