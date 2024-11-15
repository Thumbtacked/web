import { useState } from 'react';

import Editable from './Editable';
import Widget from './Widget';

export default function Note({item, update}) {
  const [hover, setHover] = useState(false);

  return (
    <Widget item={item} update={update} hover={hover} setHover={setHover}>
      <Editable
      value={item.content}
      onEdit={(value) => update({content: value})}
      />
    </Widget>
  )
}
