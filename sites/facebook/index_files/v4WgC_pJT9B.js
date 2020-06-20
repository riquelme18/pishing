if (self.CavalryLogger) { CavalryLogger.start_js(["FEt5G"]); }

__d("CavalryLoggerImpl",["Arbiter","Banzai","Bootloader","ImageTimingHelper","ISB","KillabyteProfilerConfig","NavigationTimingHelper","PageEvents","PageletEventConstsJS","PageletEventsHelper","PerfXLogger","ResourceTimingBootloaderHelper","ScriptPath","performance","performanceAbsoluteNow","__getTotalFactories","__getCompileTime","__getFactoryTime"],(function(a,b,c,d,e,f){__p&&__p();var g=b("KillabyteProfilerConfig").htmlProfilerModule,h=b("KillabyteProfilerConfig").profilerModule,i="cavalry",j=["t_start","t_paint","t_cstart"],k=window.CavalryLogger;Object.assign(k.prototype,{initializeInstrumentation:function(){__p&&__p();if(this.instrumentation_started)return;var c=this;b("Arbiter").subscribe("BigPipe/init",function(a,b){b.lid==c.lid&&b.arbiter&&(c._recordTTIEvent(b.arbiter,"tti_bigpipe"),c._recordDisplayedEvent(b.arbiter,"all_pagelets_displayed"),c._recordLoadedEvent(b.arbiter,"all_pagelets_loaded"),c._recordPageletEventsTime(b.arbiter))});b("Arbiter").subscribe("MRenderingScheduler/init",function(a,b){b.lid==c.lid&&(c._recordTTIEvent(b.arbiter,"MRenderingScheduler/tti"),c._recordDisplayedEvent(b.arbiter,"MRenderingScheduler/dd"),c._recordLoadedEvent(b.arbiter,"MRenderingScheduler/e2e"),c._recordPageletEventsTime(b.arbiter))});b("Arbiter").subscribe(b("PageEvents").BIGPIPE_ONLOAD,function(d,e){a.bigPipe&&c.lid===a.bigPipe.lid&&c.addPiggyback("cjs_factory_count_e2e",b("__getTotalFactories")()).addPiggyback("cjs_compile_time_e2e",b("__getCompileTime")()).addPiggyback("cjs_factory_time_e2e",b("__getFactoryTime")())});c.addPiggyback("script_path",b("ScriptPath").getScriptPath());this.is_detailed_profiler&&b("PageletEventsHelper").init();this.instrumentation_started=!0},_recordTTIEvent:function(a,b){__p&&__p();var c=this;a.subscribe(b,function(a,b){if(b.lid==c.lid){if(b.metrics)for(var d in b.metrics)c.addPiggyback(d,b.metrics[d]);b.usageSnapshot&&(c.ttiUsageSnapshot=b.usageSnapshot);c._setTTIPhase(b.phase).measurePageLoad(!0,b.ts);c.setAbsTimeStamp("t_bigpipe_tti",b.ts,!0)}})},_recordDisplayedEvent:function(a,b){var c=this;a.subscribe(b,function(a,b){b.lid===c.lid&&(b.usageSnapshot&&(c.ddUsageSnapshot=b.usageSnapshot),c.setAbsTimeStamp("t_marker_all_pagelets_displayed",b.ts,!0))})},_recordLoadedEvent:function(a,b){var c=this;a.subscribe(b,function(a,b){b.lid===c.lid&&c.setAbsTimeStamp("t_marker_bigpipe_e2e",b.ts,!0)})},_recordPageletEventsTime:function(a){__p&&__p();if(this.is_detailed_profiler){var c=this;a.subscribe("pagelet_event",function(a,d){if(d.lid==c.lid){a=d.id;c.events[a]=c.events[a]||{};c.events[a][d.event]=d.ts-window._cstart;d.event===b("PageletEventConstsJS").ARRIVE_END&&(c.events[a].phase=d.phase)}})}},_setTTIPhase:function(a){this.addPiggyback("tti_phase",a);return this},setTimeStamp:function(a,c,d,e){this.mark(a);var f=this.values.t_cstart||this.values.t_start;f=e?f+e:b("performanceAbsoluteNow")();this.setValue(a,f,c,d);this.tti_event&&a==this.tti_event&&this.measurePageLoad(c);return this},setAbsTimeStamp:function(a,b,c,d){this.setValue(a,b,c,d);this.tti_event&&a==this.tti_event&&this.measurePageLoad(c,b);return this},log:function(){__p&&__p();var a={lid:this.lid};b("ISB").token&&(a.fb_isb=b("ISB").token);this.addPiggyback("pagelet_events",b("PageletEventsHelper").getMetrics(this.lid));this.setValue("client_pixel_ratio_10x",parseInt((window.devicePixelRatio||1)*10,10));this._moveBootloaderData();a=babelHelpers["extends"]({t_creport:b("performanceAbsoluteNow")()},a,this.values,this.piggy_values);var c=window.__bodyWrapper;if(c.getCodeUsage&&h){if(!this.start||!this.e2e||!this.dd)throw new Error("Timestamps are missing in Cavalry. Please report this to the Web Speed team");var d=h.findUsedCSSSelectors(document,h.getDocumentStylesheets(document));d={js_calls:JSON.stringify(c.getCodeUsage()),css_selectors:JSON.stringify(d),bootloads:JSON.stringify(this._getBootloadsUntil(this.e2e))};g&&(d.html=JSON.stringify(g.getKillabyteHTMLData()));var e=babelHelpers["extends"]({},h.getDataForSnapshot(this.ddUsageSnapshot),{bootloads:JSON.stringify(this._getBootloadsUntil(this.dd))});d={e2e:d,dd:e};if(this.ttiUsageSnapshot){if(!this.tti)throw new Error("tti timestamp should always be present if we have usage data");d.tti=babelHelpers["extends"]({},h.getDataForSnapshot(this.ttiUsageSnapshot),{bootloads:JSON.stringify(this._getBootloadsUntil(this.tti))})}b("Arbiter").inform("cavalry_usage_data_collected",{usageData:d,lid:this.lid},"state");c.clearCodeUsage()}e=b("PerfXLogger").getPayload(a.lid);e&&this._logPerfXPiggybacks(a,e);b("Banzai").post(i,a,b("Banzai").VITAL);d=this.values;this.values={};this.piggy_values={};for(var c=0;c<j.length;c++)this.values[j[c]]=d[j[c]];b("Arbiter").inform("cavalry_log_sent",a,"state")},_logPerfXPiggybacks:function(a,b){a.perfx_page=b.perfx_page,a.perfx_page_type=b.perfx_page_type,a.perfx_tti=b.tti,a.perfx_e2e=b.e2e},_moveBootloaderData:function(){this.log_resources&&this.addPiggyback("resource_timing_bootloader",b("ResourceTimingBootloaderHelper").mergeBootloaderMetricsAndResourceTimings(this.piggy_values.resource_timing_bootloader,this.bootloader_metrics,!1,{}))},_collectMetrics:function(a){(!this.metric_collected||a)&&(this.metric_collected=!0,this.addPiggyback("tag",document.getElementsByTagName("*").length))},_getBootloadsUntil:function(a){var c=this;return Object.entries(b("Bootloader").getBootloadedComponents()).filter(function(b){b[0];b=b[1];return b>=c.start&&b<=a}).map(function(a){var b=a[0];a[1];return b})},measurePageLoad:function(a,b){b?this.setAbsTimeStamp("t_tti",b,a):this.setTimeStamp("t_tti",a),this._collectMetrics(a)},collectBrowserTiming:function(a){if(b("performance").timing){this.start=b("performance").timing.navigationStart;this.tti=this.values.t_bigpipe_tti;this.dd=this.values.t_marker_all_pagelets_displayed;this.e2e=this.values.t_onload;a=b("NavigationTimingHelper").getNavTimings();this.addPiggyback("navigation_timing",a);this.log_resources&&(this.addPiggyback("resource_timing_bootloader",b("ResourceTimingBootloaderHelper").getMetrics(0,!1).data),this._collectTTIAndE2EWithImages())}},collectTimingForAsync:function(a,c){__p&&__p();if(!c)return;if(b("performance").timing&&b("performance").getEntriesByName){a=b("performance").getEntriesByName(c);if(a.length===0)return;this.start=b("performance").timing.navigationStart+a[0].startTime;this.tti=this.values.t_bigpipe_tti;this.e2e=this.values.t_onload;c=b("NavigationTimingHelper").getAsyncRequestTimings(c);this.addPiggyback("navigation_timing",c);this.log_resources&&(this.addPiggyback("resource_timing_bootloader",b("ResourceTimingBootloaderHelper").getMetrics(a[0].startTime,!1).data),this._collectTTIAndE2EWithImages())}},_collectTTIAndE2EWithImages:function(){var a=b("performance").timing.navigationStart,c=this.values.t_bigpipe_tti,d=this.values.t_marker_bigpipe_e2e,e=b("ImageTimingHelper").getImageTimings(this.lid);c=b("ResourceTimingBootloaderHelper").getLastTTIAndE2EImageResponseEnds(c,d,e);!isNaN(c.TTI)&&c.TTI!==a&&this.setAbsTimeStamp("t_tti_with_images",c.TTI);!isNaN(c.E2E)&&c.E2E!==a&&this.setAbsTimeStamp("t_marker_bigpipe_e2e_with_images",c.E2E)}});Object.assign(k,{startInstrumentation:function(){for(var a in k.instances){var b=k.instances[a];b.initializeInstrumentation();"t_tti"in b.values&&b.measurePageLoad(!1,b.values.t_tti)}},hookLogOnLoad:function(a){b("Arbiter").registerCallback(function(){k.setPageID(a),k.instances[a].log()},[b("PageEvents").NATIVE_ONLOAD])},hookCollectAndLogOnLoad:function(a){b("Arbiter").registerCallback(function(){k.getInstance(a).collectBrowserTiming(),k.getInstance(a).log()},[b("PageEvents").BIGPIPE_ONLOAD])}});e.exports=k}),null);