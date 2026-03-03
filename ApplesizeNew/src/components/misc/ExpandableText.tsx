import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import { colors, typography } from '../../theme';

interface ExpandableTextProps {
  text: string;
  numberOfLines?: number;
  expandLabel?: string;
  collapseLabel?: string;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  numberOfLines = 3,
  expandLabel = 'Read more',
  collapseLabel = 'Read less',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    // This is a simplified check – in production you'd measure more accurately
    setShowButton(height > numberOfLines * 20);
  };

  return (
    <>
      <Text
        style={styles.text}
        numberOfLines={expanded ? undefined : numberOfLines}
        onLayout={handleTextLayout}
      >
        {text}
      </Text>
      {showButton && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.button}>
            {expanded ? collapseLabel : expandLabel}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    ...typography.body,
    color: colors.text,
    lineHeight: 20,
  },
  button: {
    ...typography.body,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
});
