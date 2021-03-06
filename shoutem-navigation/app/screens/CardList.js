import React from 'react';
import _ from 'lodash';
import { connectStyle } from '@shoutem/theme';
import { CARD_LIST } from '../const';
import CardListItem from '../components/CardListItem';
import { connect } from 'react-redux';
import { FolderBaseScreen } from './FolderBaseScreen';
import { shortcutChildrenRequired } from '../helpers';

const HEIGHT_RATIO_STYLE_KEY = 'heights';

class CardList extends FolderBaseScreen {
  // itemText value when there is no text
  static NO_TEXT = 'noText';

  static propTypes = {
    ...FolderBaseScreen.propTypes,
    // Text position; Also defines if there shouldn't be text.
    itemText: React.PropTypes.string,
    // Gutter size key
    itemGutter: React.PropTypes.string,
    // Used to calculate item height
    cardHeight: React.PropTypes.string,
    // Is item full screen width
    isFullWidth: React.PropTypes.bool,
  };

  resolvePageProps() {
    const { style } = this.props;
    const { itemGutter, isFullWidth } = this.getLayoutSettings();
    const { screenDimensions: { height } } = this.state;
    const styleName = `${itemGutter}-gutter ${isFullWidth ? 'full-width' : ''}`;
    return {
      style: {
        minHeight: height,
        ...style.page,
      },
      styleName,
    };
  }

  renderRow(shortcut, index) {
    const { itemText, backgroundImagesEnabled, cardHeight, itemGutter } = this.getLayoutSettings();
    const { style } = this.props;
    const styleName = `${itemText} ${itemGutter}-gutter`;
    const { screenDimensions: { width } } = this.state;
    const heightRatio = _.get(style, ['item', HEIGHT_RATIO_STYLE_KEY, cardHeight], 1);
    const cardItemStyle = {
      item: {
        ...style.item,
        height: width * heightRatio,
      },
      text: style.text,
    };
    // Remove non RN style
    delete cardItemStyle.item[HEIGHT_RATIO_STYLE_KEY];
    return (
      <CardListItem
        key={`item_${index}`}
        showText={itemText !== CardList.NO_TEXT}
        shortcut={shortcut}
        onPress={this.itemPressed}
        style={cardItemStyle}
        styleName={styleName}
        showBackground={backgroundImagesEnabled}
      />
    );
  }
}

const mapStyleNamesToProps = (styleNames, props) => {
  if (props.itemText !== CardList.NO_TEXT) {
    styleNames.push('text-hidden');
  }
  return styleNames;
};

export default shortcutChildrenRequired(
  connect(FolderBaseScreen.mapStateToProps, FolderBaseScreen.mapDispatchToProps)(
    connectStyle(CARD_LIST, undefined, mapStyleNamesToProps)(CardList)
  )
);
