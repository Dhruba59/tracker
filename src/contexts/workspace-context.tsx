import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface InitialValue {
  workspaceId: string;
  setWorkspaceId: Dispatch<SetStateAction<string>>;
}

const WorkspaceContext = createContext<InitialValue>(null!);

export const WorkspaceContextProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [workspaceId, setWorkspaceId] = useState<string>('');
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