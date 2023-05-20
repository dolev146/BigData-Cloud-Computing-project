import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload } from 'kafkajs'


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['dory.srvs.cloudkafka.com:9094'],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-512', // scram-sha-256 or scram-sha-512
    username: 'qhagfczs',
    password: 'Wf5RcdxJ5KoXVvGHkXCG7CyifjE69FZw'
  },
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'qhagfczs-' })


const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'qhagfczs-test-topic',
    messages: [
      { value: 'Hello KafkaJS u123ser!' },
    ],
  })
  await consumer.connect()
  await consumer.subscribe({ topic: 'qhagfczs-test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async (messagePayload: EachMessagePayload) => {
      const { topic, partition, message } = messagePayload
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
    }
  })


  // Consuming
  return
}

run().then(()=>{
  console.log("message sent")
}).catch(console.error)