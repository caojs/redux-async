import { connect } from 'react-redux';
import asyncConnectCreator from '../components/AsyncConnect';
import { beginGlobalLoad, endGlobalLoad } from '../store';

export default function componentContainer(structure) {
  return connect(null, { beginGlobalLoad, endGlobalLoad })(asyncConnectCreator(structure));
}
