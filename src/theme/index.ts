import { extendTheme } from '@chakra-ui/react';

import { colors } from './foundations/colors';
import { styles } from './styles';
import { Button } from './components';

const theme = extendTheme({ colors, styles, components: { Button } });

export default theme;
