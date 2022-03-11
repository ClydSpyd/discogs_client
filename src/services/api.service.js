import axios from 'axios'

const baseURL = "https://api.discogs.com/"

const keys = "&key=edOhNOqtNjAcYBNsYBBo&secret=mAketqYyVhwHOolGeSbxGyYBOgRjhMwi"

export const getFromApi = async (query, auth) => {
  
  const url = `${baseURL}${query}${auth ? keys : ""}`
  console.log(auth ? "true" : "false")
  
  try {

    const { data, config, headers, request, status } = await axios.get( url )
    console.log(data)
    return data;
    
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export const returnReleases = async title => {
  
  let releases = await getFromApi(`/database/search?type=master&artist=${title}`, true);

  //sort chronologically
  releases = [...releases.results.filter(i => i.format.includes('Album')).sort((a,b) => a.year-b.year)];

  //exclude multiples by identifying (x) format in string
  const regex = /\(([^)]+)\)/
  releases = releases.filter(i => !regex.test(i.title))

  //exclude live albums
  releases = releases.filter(i => !i.format.includes('Club Edition'))

  //remove artist name from string
  releases = releases.map(i => {return {...i, title:i.title.replace(`${title} - `, '') }})

  console.log(releases)
  return releases

}

