import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventItem } from '@/components/EventItem/EventItem';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { DataContext } from '@/contexts/DataContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { requester } from '@/requester/requester';
import { containers } from '@/styling/common';
import { ApiEndpoints, ElbetitsaApiCalls, GetEventsResponse, PublicEvent } from '@/types';


export default function HomeScreen() {

  const { events, setPublicData, refreshEvents } = useContext(DataContext);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { t } = useTranslation();

  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.getPublicEvents] });

  const loadPublicEvents: () => Promise<void> = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res: GetEventsResponse = await requester({
        ...requestArgs,
        queryKeys: ['currentPage'],
        queries: {
          currentPage: page,
        }
      });
      if (res.events?.length === 0) {
        setHasMore(false);
      } else {
        setPage((st) => st + 1);
        setPublicData(res.events);
      }
    } catch (err) {
      console.log('Fetch public events error', err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, page, loading, refreshing])

  const refreshPublicEvents: () => Promise<void> = useCallback(async () => {
    if (loading) return;
    setRefreshing(true);
    refreshEvents();
    setPage(1);
    setHasMore(true);
    await loadPublicEvents();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    refreshPublicEvents();
  }, [])

  const color = useThemeColor({}, 'primary');
  const bgcolor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={containers.mainContainer}>

      <FlatList
        data={events}
        renderItem={({ item }: { item: PublicEvent }) => <EventItem item={item} key={item.id} />}
        onEndReached={loadPublicEvents}
        onEndReachedThreshold={0}

        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={refreshPublicEvents}
          colors={[color]}
          progressBackgroundColor={bgcolor}
          tintColor={color}
        />}

        ListFooterComponent={<>
          {hasMore && <ThemedView style={styles.titleContainer}>
            <ThemedText>...{t('seeMore')}</ThemedText>
          </ThemedView>}
        </>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
