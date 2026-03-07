import React, { useState } from 'react';
import { View } from 'react-native';
import { TabSwitcher } from '../components/TabSwitcher';
import { ProductFeedScreen } from './ProductFeedScreen';
import { DemandFeedScreen } from './DemandFeedScreen';

export const FeedScreen = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <TabSwitcher
        tabs={['Products', 'Demands']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === 0 ? <ProductFeedScreen /> : <DemandFeedScreen />}
    </View>
  );
};
