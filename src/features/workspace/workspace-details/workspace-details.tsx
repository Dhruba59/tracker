import TrackerCard from '@components/common/tracker/tracker-card';
import { ResponseType } from '@models/global-models';
import { getTrackersByWorkspaceId } from '@services/tracker-service';
import { getWorkspaceById } from '@services/workspace-services';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WorkspaceDetails = () => {
  const {id} = useParams();
  const [trackers, setTrackers] = useState();

  const fetchWorkspaceTrackers = async () => {
    try {
      const res: ResponseType = await getTrackersByWorkspaceId(id ?? '');
      setTrackers(res.payload);
    } catch {
      console.log('error');
    };
  };
  useEffect(() => {
    fetchWorkspaceTrackers();
  }, []);

  return (
    <div className='workspace-details-container'>
      {/* <TrackerCard /> */}
    </div>
  );
};

export default WorkspaceDetails;