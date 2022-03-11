import React, { useEffect, useState } from 'react';
import {getFromApi, returnReleases} from '../../services/api.service';
import ripple from '../../assets/loaders/loader_ripple.svg'
import eclipse from '../../assets/loaders/loader_eclipse.svg'

import styles from './ArtistBlock.module.scss';

const ArtistBlock = ({result: { id, type, master_id, uri, title, thumb, cover_image, resource_url  }}) => {

  const [ fullDetails, setFullDetails ] = useState(null)
  const [ loading, toggleLoading ] = useState({details:false,releases:true})
  const getArtistData = async () => {
    setFullDetails(null)
    const artistDetails = await getFromApi(`artists/${id}`);
    const releases = await returnReleases(title);
    setFullDetails({...artistDetails, releases})
  }
  
  useEffect(()=>{
    setFullDetails({...fullDetails, releases:null})
    getArtistData()
  },[id])

  return (
    <div className={styles.container}>
      {
        !fullDetails ? 
        <div className={`${styles.loader}`}>
          <img src={eclipse} alt="" />
        </div>

        :
        fullDetails &&
        <div className={`${styles.main}`}>
          <h4>{title}</h4>
          <div className={`${styles.details}`}>
            <img src={cover_image} className={`${styles.mainPic}`} />
            <div className={`${styles.artistBio}`}>
              <p className={`${styles.heading}`}>Artist bio</p>
              <p>{fullDetails.profile}</p>
            </div>

          </div>
            <p className={`${styles.heading}`}>Releases</p>
            <div className={`${styles.releases}`}>
              {
                !fullDetails.releases ? 
                  <div className={`${styles.loader}`}>
                    <img src={ripple} alt="" />
                  </div>
                :
                  fullDetails.releases.length == 0 ?
                    <h6 className={`${styles.noReleases}`}>No releases found</h6>

                :
                  fullDetails.releases?.map((i,idx) =>
                    <div key={idx} className={`${styles.releaseBlock}`} >
                      <h5>{i.title}</h5>
                      <h6>{i.year}</h6>
                      <div style={{background:`url(${i.cover_image}) no-repeat center/cover`}} className={`${styles.coverPic}`} />
                      <div className={`${styles.overlay}`} />
                    </div>
                )
              }
            </div>
          </div>
      }

    </div>
  )

}

export default ArtistBlock;