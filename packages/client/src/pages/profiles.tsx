import ProfileForm from '../components/profileForm';
import React from 'react';

interface ProfilesListProps {
  list: any[];
  loadProfileForm: () => void;
}
function ProfilesList(props: ProfilesListProps) {
  const taiwindStyles = {
    profile: ``,
    profileBtn: `border-2 border-blue-500 rounded-md
                text-center py-1 w-full`,
  };

  return (
    <ul className=''>
      {props.list.map((item) => (
        <li className={`${taiwindStyles.profile}`}>
          <button className={`${taiwindStyles.profileBtn}`}>{item}</button>
        </li>
      ))}
      <li className={`${taiwindStyles.profile}`}>
        <button
          className={`${taiwindStyles.profileBtn}`}
          onClick={props.loadProfileForm}
        >
          +
        </button>
      </li>
    </ul>
  );
}

type Actions = 'loadProfileForm' | 'loadProfilesList';
interface Action {
  type: Actions;
  data?: any;
}
interface State {
  loadedComponent: 'profileForm' | 'profileList';
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loadProfileForm':
      return {
        ...state,
        loadedComponent: 'profileForm',
      };
    case 'loadProfilesList':
      return {
        ...state,
        loadedComponent: 'profileList',
      };
    default: {
      return state;
    }
  }
}

function Profiles() {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(reducer, {
    loadedComponent: 'profileList',
  });

  return (
    <section className='flex items-center justify-center min-h-full'>
      <div className='w-1/2'>
        {state.loadedComponent === 'profileList' ? (
          <>
            <h1 className='text-center'>Profiles List</h1>
            <ProfilesList
              list={[]}
              loadProfileForm={() => {
                // @ts-ignore
                dispatch({ type: 'loadProfileForm' });
              }}
            />
          </>
        ) : (
          <>
            <h1 className='text-center'>add new profile</h1>
            <ProfileForm
              onSubmit={() => {
                // todo: create new profile
                // @ts-ignore
                dispatch({ type: 'loadProfilesList' });
              }}
              onCancel={() => {
                // @ts-ignore
                dispatch({ type: 'loadProfilesList' });
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Profiles;
