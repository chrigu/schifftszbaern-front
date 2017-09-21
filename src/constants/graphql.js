import gql from 'graphql-tag'

export const WEATHER_LOCATION = gql`
    query {
    allWeatherLocations(last: 1) {
        createdAt
        intensity
        temperature
        weatherCode
    }
}
`

export const WEATHER_LOCATION_SUBSCRIPTION = gql`
  subscription newWeatherLocations {
    WeatherLocation(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        createdAt
        intensity
        temperature
        weatherCode
      }
    }
  }
`
