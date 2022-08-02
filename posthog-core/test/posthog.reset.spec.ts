import { PostHogPersistedProperty } from '../src'
import { createTestClient, PostHogCoreTestClient, PostHogCoreTestClientMocks } from './test-utils/PostHogCoreTestClient'

describe('PostHog Core', () => {
  let posthog: PostHogCoreTestClient
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mocks: PostHogCoreTestClientMocks

  beforeEach(() => {
    ;[posthog, mocks] = createTestClient('TEST_API_KEY', {})
  })

  describe('reset', () => {
    it('should reset the storage when called', () => {
      const distinctId = posthog.getDistinctId()
      posthog.overrideFeatureFlag({
        foo: 'bar',
      })
      posthog.register({
        prop: 1,
      })

      expect(posthog.getPersistedProperty(PostHogPersistedProperty.AnonymousId)).toEqual(distinctId)
      expect(posthog.getPersistedProperty(PostHogPersistedProperty.OverrideFeatureFlags)).toEqual({ foo: 'bar' })
      expect(posthog.getPersistedProperty(PostHogPersistedProperty.Props)).toEqual({ prop: 1 })

      posthog.reset()

      expect(posthog.getDistinctId()).not.toEqual(distinctId)
      expect(posthog.getPersistedProperty(PostHogPersistedProperty.OverrideFeatureFlags)).toEqual(undefined)
      expect(posthog.getPersistedProperty(PostHogPersistedProperty.Props)).toEqual(undefined)
    })
  })
})