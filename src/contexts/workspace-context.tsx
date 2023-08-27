import { WorkspaceContextInitialValue } from '@models/workspace';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

const WorkspaceContext = createContext<WorkspaceContextInitialValue>(null!);

export const WorkspaceContextProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [workspaceId, setWorkspaceId] = useState<string>('') ;
  return (
    <WorkspaceContext.Provider value={{workspaceId, setWorkspaceId}} >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => {
  const { workspaceId, setWorkspaceId } = useContext(WorkspaceContext);
  return { workspaceId, setWorkspaceId };
};