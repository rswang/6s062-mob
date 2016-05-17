# 6MOB project - ksiegel and rswang

Information about Arduino motes is stored in the RoomSensor collection.
RoomSensor: {sensorID: String, temperature: Double, humidity: Double, lastMotionTime: Date, lastSeen: Date, notes: String}

When a new reading is received, an object is created in the Entry collection, storing the received data and the date the data was received.
Entry: {date: Date, data: String}

From this reading, a new object in the SensorValue collection is created. We keep the SensorValue collection separate from the Entry collection, as entries in the SensorValue collection can be deleted for aggregation purposes.
SensorValue: {sensorID: String, type: String, value: String, date: Date}

Readings are aggregated with a larger filter into events, stored in the Event collection.
Event: {sensor: String, startDate: Date, endDate: Date, type: String}



